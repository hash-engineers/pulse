import { Button } from '@/components/ui/button';
import { Pause, Send, Settings, ShieldAlert } from 'lucide-react';

export function Actions() {
  return (
    <div className="text-muted-foreground flex items-center justify-start gap-2 flex-wrap">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center justify-center gap-x-2"
      >
        <Send size="16" /> <span>Send a test alert</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center justify-center gap-x-2"
      >
        <ShieldAlert size="16" /> <span>Incidents</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center justify-center gap-x-2"
      >
        <Pause size="16" /> <span>Pause</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center justify-center gap-x-2"
      >
        <Settings size="16" /> <span>Configure</span>
      </Button>
    </div>
  );
}
