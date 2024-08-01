import axios from 'axios';
import { api } from '@/lib/api';
import { monitors } from '@/lib/monitor';
import { MonitorKeyInfo } from './_monitor-key-info.';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Props = { userId?: string };

export async function AllMonitors({ userId }: Props) {
  if (userId) {
    try {
      const dbmonitors = await axios.get(`${api}/monitors`, {
        data: { userId },
      });
    } catch (error) {
      console.error('Error fetching monitors:', error);
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="text-muted-foreground lg:w-4/5"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-sm hover:no-underline select-none">
          Monitors
        </AccordionTrigger>
        <AccordionContent className="space-y-2">
          {monitors.map(props => (
            <MonitorKeyInfo key={props.url} {...props} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
