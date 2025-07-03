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
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEditClick} className="flex justify-between gap-x-2">
          Edit
          <FilePenLine />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="flex justify-between gap-x-2">
          Delete
          <Trash2 />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TransactionActionsDropdown;
