import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";

const ChildHeaderBar = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center text-9xl font-bold">
        <Label className="text-lg">인사 정보</Label>
      </div>

      <div className="flex items-center gap-6 justify-end">
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">
            조직관리
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>인사 정보</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    </div>
    </div>
  );
};

export default ChildHeaderBar;
