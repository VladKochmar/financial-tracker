import type { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { FilePenLine, MoreHorizontal, Trash2 } from 'lucide-react';

interface TransactionActionsDropdownProps {
  onDelete: () => void;
  onEditClick: () => void;
}

const TransactionActionsDropdown: FC<TransactionActionsDropdownProps> = ({ onDelete, onEditClick }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" aria-label="Open dropdown menu" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem aria-label="Open edit transaction menu" onClick={onEditClick} className="flex justify-between gap-x-2">
          Edit
          <FilePenLine />
        </DropdownMenuItem>
        <DropdownMenuItem aria-label="Delete transaction" onClick={onDelete} className="flex justify-between gap-x-2">
          Delete
          <Trash2 />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TransactionActionsDropdown;
