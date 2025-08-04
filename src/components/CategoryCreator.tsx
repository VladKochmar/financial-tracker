import { type FC, useState } from 'react';
import { useTransactionsStore } from '../stores/useTransactionsStore';

import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

interface CategoryCreatorProps {
  style?: Record<string, string>;
}

const CategoryCreator: FC<CategoryCreatorProps> = ({ style }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addCategory = useTransactionsStore(state => state.addCategory);

  const reset = () => {
    setHsva({ h: 214, s: 43, v: 90, a: 1 });
    setTitle('');
  };

  const handleClick = () => {
    const errObj: Record<string, string> = {};

    if (!title) errObj.title = 'Title is required';

    if (!hsva) errObj.hsva = 'Color is required';

    if (Object.keys(errObj).length) {
      setErrors(errObj);
      return;
    }

    setErrors({});
    const category = { title, color: hsvaToHex(hsva) };
    addCategory(category);
    setOpen(false);
    reset();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="lg" variant="outline" style={style}>
          Create new category
        </Button>
      </PopoverTrigger>
      <PopoverContent data-testid="popover-content" className="w-full max-w-80">
        <div className="grid gap-y-4">
          <h3 className="font-bold">New Category</h3>
          <div>
            <Label htmlFor="category-title">Title</Label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Type category title"
              id="category-title"
              data-testid="category-title"
              className={`${errors.title ? 'border-destructive' : null}`}
            />
            {errors.title && <p className="text-sm text-destructive pt-2">{errors.title}</p>}
          </div>
          <div>
            <Label>Color</Label>
            <Wheel color={hsva} onChange={color => setHsva({ ...hsva, ...color.hsva })} />
            {errors.hsva && <p className="text-sm text-destructive">{errors.hsva}</p>}
          </div>
          <Button onClick={handleClick}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryCreator;
