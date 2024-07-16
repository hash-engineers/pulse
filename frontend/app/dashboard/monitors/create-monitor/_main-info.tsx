export function MainInfo() {
  return (
    <div className="hidden lg:block col-span-1 space-y-10">
      <div className="max-w-sm tracking-wide">
        <h5 className="text-primary-foreground">What to monitor</h5>
        <p className="font-light">
          Configure the target website you want to monitor. You&apos;ll find the
          advanced configuration below, in the advanced settings section.
        </p>
      </div>

      <div>
        <h5 className="text-primary-foreground">On-call escalation</h5>
        <p>
          Set up rules for who&apos;s going to be notified and how when an
          incident occurs.
        </p>
        <p>Notify the entire team as a last resort option.</p>
        <p>Alternatively, set up an advanced escalation policy.</p>
      </div>
    </div>
  );
}
