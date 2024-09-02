import { Monitor } from '@/types/monitor';
import { MonitorKeyInfo } from './_monitor-key-info.';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

type Props = { monitors: Monitor[] };

export function AllMonitors({ monitors }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="open"
      className="text-muted-foreground lg:w-4/5"
    >
      <AccordionItem value="open">
        <AccordionTrigger className="text-sm hover:no-underline select-none">
          Monitors
        </AccordionTrigger>
        <AccordionContent className="space-y-2">
          {monitors.map(
            ({ id, url, name, status, createdAt, incidents }: Monitor) => (
              <MonitorKeyInfo
                key={url}
                id={id}
                url={url}
                name={name}
                status={status}
                createdAt={createdAt}
                incidents={incidents}
                checkingTime="none"
              />
            )
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
