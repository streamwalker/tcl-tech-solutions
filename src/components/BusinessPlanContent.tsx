
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExecutiveSummary from "./business-plan/ExecutiveSummary";
import CompanyMarket from "./business-plan/CompanyMarket";
import ProductsStrategy from "./business-plan/ProductsStrategy";
import OperationsTeam from "./business-plan/OperationsTeam";
import Financials from "./business-plan/Financials";
import Timeline from "./business-plan/Timeline";

const BusinessPlanContent = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Business Plan Overview
            </h2>
            <p className="text-xl text-gray-600">
              Navigate through our comprehensive business strategy and growth plan
            </p>
          </div>

          <Tabs defaultValue="executive" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
              <TabsTrigger value="executive">Executive</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="executive">
              <ExecutiveSummary />
            </TabsContent>

            <TabsContent value="company">
              <CompanyMarket />
            </TabsContent>

            <TabsContent value="products">
              <ProductsStrategy />
            </TabsContent>

            <TabsContent value="operations">
              <OperationsTeam />
            </TabsContent>

            <TabsContent value="financials">
              <Financials />
            </TabsContent>

            <TabsContent value="timeline">
              <Timeline />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default BusinessPlanContent;
