"use client";

function InputForm() {
  return (
    <div className="grid gap-4 h-screen md:grid-cols-2">
      <div className="aspect-video rounded-xl bg-muted " />
      <div className="grid gap-4 h-full">
        <div className="aspect-video rounded-xl bg-muted/50 h-1/2" />
        <div className="aspect-video rounded-xl bg-muted/50 h-1/2" />
      </div>
    </div>
  );
}

export default InputForm;
