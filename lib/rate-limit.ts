import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from './env';

// In-memory rate limiter for development
class MemoryRateLimit {
  private requests = new Map<string, { count: number; resetTime: number }>();

  async limit(identifier: string, limit: number, window: number): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const key = `${identifier}:${Math.floor(now / window)}`;
    
    const current = this.requests.get(key) || { count: 0, resetTime: now + window };
    
    if (now > current.resetTime) {
      current.count = 0;
      current.resetTime = now + window;
    }
    
    current.count++;
    this.requests.set(key, current);
    
    const success = current.count <= limit;
    const remaining = Math.max(0, limit - current.count);
    const reset = current.resetTime;
    
    return { success, limit, remaining, reset };
  }
}

// Use Upstash Redis in production, memory in development
const redis = env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const memoryRateLimit = new MemoryRateLimit();

export const rateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
    })
  : memoryRateLimit;

export const strictRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute
    })
  : memoryRateLimit;

export async function checkRateLimit(
  identifier: string,
  strict: boolean = false
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const limiter = strict ? strictRateLimit : rateLimit;
  
  if (redis) {
    return await limiter.limit(identifier);
  } else {
    return await (limiter as MemoryRateLimit).limit(identifier, strict ? 5 : 10, 60000);
  }
}
