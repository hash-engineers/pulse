import { monitors } from '@/lib/monitor';
import { MonitorKeyInfo } from './_monitor-key-info.';
import { SearchAndCreateMonitor } from './_search-and-create-monitor';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Monitors() {
  return (
    <section className="space-y-4">
      <h3>Hey Mehedi, Here is your monitors stutas!</h3>
      <SearchAndCreateMonitor />

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
    </section>
  );
}
