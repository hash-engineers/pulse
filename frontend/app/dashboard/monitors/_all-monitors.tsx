import axios from 'axios';
import { api } from '@/lib/api';
import { Monitor } from '@/types/monitor';
import { MonitorKeyInfo } from './_monitor-key-info.';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

type Props = { userId: string };

export async function AllMonitors({ userId }: Props) {
  let monitors: Monitor[] | null = null;

  if (userId) {
    try {
      const res = await axios.get(`${api}/monitors`, {
        data: { userId },
      });

      monitors = res?.data?.data;
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
          {monitors &&
            monitors.map(({ id, url, name, status, createdAt }: Monitor) => (
              <MonitorKeyInfo
                key={url}
                id={id}
                url={url}
                name={name}
                status={status}
                createdAt={createdAt}
                checkingTime="none"
              />
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
