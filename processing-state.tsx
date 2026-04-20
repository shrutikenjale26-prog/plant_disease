import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function ProcessingState() {
  return (
    <Card className="mb-8">
      <CardContent className="pt-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="text-white text-2xl animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Plant</h3>
          <p className="text-gray-600 mb-4">Our AI is identifying the plant and checking for diseases...</p>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
            <div className="bg-forest h-2 rounded-full w-3/4 transition-all duration-1000"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">This usually takes 10-15 seconds</p>
        </div>
      </CardContent>
    </Card>
  );
}
