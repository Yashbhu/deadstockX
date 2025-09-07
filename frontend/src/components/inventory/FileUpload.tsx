import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet, Camera, CheckCircle } from "lucide-react";
import { addInvoice } from "@/services/api";

export const FileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [mode, setMode] = useState<"csv" | "ocr">("csv");
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file_url", file.name); // replace with actual file upload logic
    formData.append("supplier", "ABC Traders");
    formData.append("items", JSON.stringify([]));

    try {
      setIsUploading(true);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);

      const response = await addInvoice(formData);
      setUploadComplete(true);
      toast({ title: "Upload Complete!", description: `Invoice ID ${response.invoice_id} added successfully` });
    } catch (err) {
      toast({ title: "Upload Failed", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Upload className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-green-800">Upload Your Inventory</h2>
      </div>

      {!uploadComplete ? (
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card
              className={`glass-subtle p-4 hover-lift cursor-pointer ${mode === "csv" ? "border-2 border-primary" : ""}`}
              onClick={() => setMode("csv")}
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-green-800">CSV/Excel Upload</h3>
                  <p className="text-sm text-green-600">Upload your existing inventory spreadsheets</p>
                </div>
              </div>
            </Card>

            <Card
              className={`glass-subtle p-4 hover-lift cursor-pointer ${mode === "ocr" ? "border-2 border-success" : ""}`}
              onClick={() => setMode("ocr")}
            >
              <div className="flex items-center gap-3">
                <Camera className="h-8 w-8 text-success" />
                <div>
                  <h3 className="font-semibold text-green-800">Smart Invoice OCR</h3>
                  <p className="text-sm text-green-600">Snap photos of invoices - AI will extract products!</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Drag & Drop */}
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Drop your files here, or click to browse</h3>
                <p className="text-green-600">
                  Support for {mode === "ocr" ? "invoice images (OCR)" : "CSV/Excel files"}
                </p>
              </div>
            </div>
          </div>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept={mode === "ocr" ? ".jpg,.jpeg,.png,.pdf" : ".csv,.xlsx,.xls"}
            onChange={handleFileUpload}
          />

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Processing your inventory...</span>
                <span className="text-foreground font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>
      ) : (
        /* Upload Complete */
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">🎉 Upload Complete!</h3>
            <p className="text-muted-foreground mb-4">Your inventory has been processed successfully.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setUploadComplete(false)}>
                Upload More
              </Button>
              <Button className="bg-gradient-primary" onClick={() => window.location.assign("/dashboard?tab=seeinventory")}>
                View Inventory
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
