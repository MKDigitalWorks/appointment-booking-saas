import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Field } from '@/components/forms/Field';
import { cn } from '@/lib/utils';

interface Organization {
  id: string;
  name: string;
  slug: string;
}

interface OrgSwitcherProps {
  organizations: Organization[];
  currentOrg?: Organization;
  onOrgChange: (org: Organization) => void;
  onCreateOrg: (name: string, slug: string) => void;
}

export function OrgSwitcher({
  organizations,
  currentOrg,
  onOrgChange,
  onCreateOrg,
}: OrgSwitcherProps) {
  const t = useTranslations('dashboard');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const [newOrgName, setNewOrgName] = React.useState('');
  const [newOrgSlug, setNewOrgSlug] = React.useState('');

  const handleCreateOrg = () => {
    if (newOrgName && newOrgSlug) {
      onCreateOrg(newOrgName, newOrgSlug);
      setNewOrgName('');
      setNewOrgSlug('');
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          {currentOrg ? currentOrg.name : 'Select organization...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ModalTrigger>
      <ModalContent className="w-[400px]">
        <ModalHeader>
          <ModalTitle>Switch Organization</ModalTitle>
        </ModalHeader>
        <div className="space-y-4">
          {organizations.map((org) => (
            <div
              key={org.id}
              className={cn(
                'flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-accent',
                currentOrg?.id === org.id && 'bg-accent'
              )}
              onClick={() => {
                onOrgChange(org);
                setIsOpen(false);
              }}
            >
              <div>
                <div className="font-medium">{org.name}</div>
                <div className="text-sm text-muted-foreground">
                  {org.slug}
                </div>
              </div>
              {currentOrg?.id === org.id && (
                <Check className="h-4 w-4" />
              )}
            </div>
          ))}
          
          {isCreating ? (
            <div className="space-y-4 border-t pt-4">
              <Field
                label="Organization Name"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                placeholder="Enter organization name"
              />
              <Field
                label="URL Slug"
                value={newOrgSlug}
                onChange={(e) => setNewOrgSlug(e.target.value)}
                placeholder="Enter URL slug"
              />
              <div className="flex space-x-2">
                <Button onClick={handleCreateOrg} size="sm">
                  Create
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsCreating(true)}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Organization
            </Button>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
}
