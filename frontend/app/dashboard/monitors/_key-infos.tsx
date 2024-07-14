export function KeyInfos() {
  return (
    <div className="text-muted-foreground grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="border p-4 rounded-md">
        <h6>Currently up for</h6>
        <h3 className="text-foreground">2 dasy 4 hours 3 munites</h3>
      </div>
      <div className="border p-4 rounded-md">
        <h6>Last checked at</h6>
        <h3 className="text-foreground">3 minutes</h3>
      </div>
      <div className="border p-4 rounded-md">
        <h6>Incidents</h6>
        <h3 className="text-foreground">0</h3>
      </div>
    </div>
  );
}