export function SpecGovLogo() {
  return (
    <div className="flex items-center gap-3" aria-label="SpecGov">
      <div className="grid size-9 grid-cols-3 grid-rows-3 gap-0.5 rounded-md bg-specgov-navy p-1 dark:bg-specgov-cobalt">
        <span className="col-span-2 bg-white" />
        <span className="bg-specgov-cobalt" />
        <span className="bg-white" />
        <span className="col-span-2 bg-white" />
        <span className="bg-specgov-souyess" />
        <span className="col-span-2 bg-white" />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-extrabold tracking-[-0.02em] text-specgov-navy dark:text-specgov-dark-text">
          SpecGov
        </p>
        <p className="truncate text-[9px] font-medium uppercase tracking-[0.15em] text-specgov-slate-muted">
          Grupo Souyess
        </p>
      </div>
    </div>
  );
}
