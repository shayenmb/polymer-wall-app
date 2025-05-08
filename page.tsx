'use client';
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function PolymerWallCalculator() {
  const [material, setMaterial] = useState("פאלייט");
  const [thickness, setThickness] = useState(3);
  const [area, setArea] = useState(10);
  const [profitMargin, setProfitMargin] = useState(90);
  const [graphics, setGraphics] = useState("ללא");
  const [installation, setInstallation] = useState("כן");
  const [profileMeters, setProfileMeters] = useState(0);
  const [profilePrice, setProfilePrice] = useState(0);

  const resetForm = () => {
    setMaterial("פאלייט");
    setThickness(3);
    setArea(10);
    setProfitMargin(90);
    setGraphics("ללא");
    setInstallation("כן");
    setProfileMeters(0);
    setProfilePrice(0);
  };

  const sheetArea = 4.5;
  const sheetsNeeded = Math.ceil(area / sheetArea);
  const totalCalcArea = sheetsNeeded * sheetArea;

  const materialPricePerMM = material === "פאלייט" ? 9.5 : 19;
  const extraProductionCost = material === "פאלייט" ? 12 : 22;
  const rawMaterialCost = materialPricePerMM * thickness * totalCalcArea;
  const inkCost = 16 * totalCalcArea;
  const productionCost = extraProductionCost * totalCalcArea;
  const totalManufacturingCost = rawMaterialCost + inkCost + productionCost + 4.8;

  const costBeforeProfit = totalManufacturingCost * 1.27;
  const finalMaterialCost = costBeforeProfit * (1 + profitMargin / 100);

  const graphicsCost = graphics === "שינוי צבעים" ? 450 : graphics === "גרפיקה מותאמת אישית" ? 1250 : 0;
  const installationCost = installation === "כן" ? area * 150 : 0;
  const profilesCost = profileMeters * profilePrice;

  const totalBeforeVAT = finalMaterialCost + graphicsCost + installationCost + profilesCost;
  const totalWithVAT = totalBeforeVAT * 1.18;

  return (
    <div className="grid grid-cols-1 gap-6 p-6 max-w-2xl mx-auto text-right">
      <div className="flex flex-col items-end text-right w-full" dir="rtl">
        <img src="/Artboard 1.png" alt="Fibonacci Group Logo" className="w-36 h-auto mb-1 ml-auto" style={{ transform: "scale(1.1)" }} />
        <h2 className="text-2xl font-bold text-center w-full">חישוב קיר פולימרי</h2>
      </div>

      <Card>
        <CardContent className="grid grid-cols-2 gap-4 p-6 text-right">
          <div className="flex flex-col items-end text-right">
            <label>סוג חומר</label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger className="text-right w-36">{material}</SelectTrigger>
              <SelectContent>
                <SelectItem value="פאלייט">פאלייט</SelectItem>
                <SelectItem value="פרספקס">פרספקס</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-end text-right">
            <label>עובי (מ"מ)</label>
            <Select value={thickness.toString()} onValueChange={(v) => setThickness(parseInt(v))}>
              <SelectTrigger className="text-right w-36">{thickness} מ"מ</SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((v) => (
                  <SelectItem key={v} value={v.toString()}>{v} מ"מ</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-end text-right">
            <label>גרפיקה</label>
            <Select value={graphics} onValueChange={setGraphics}>
              <SelectTrigger className="text-right w-36">{graphics}</SelectTrigger>
              <SelectContent>
                <SelectItem value="ללא">ללא</SelectItem>
                <SelectItem value="שינוי צבעים">שינוי צבעים</SelectItem>
                <SelectItem value="גרפיקה מותאמת אישית">גרפיקה מותאמת אישית</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-end text-right">
            <label>כולל התקנה</label>
            <Select value={installation} onValueChange={setInstallation}>
              <SelectTrigger className="text-right w-36">{installation}</SelectTrigger>
              <SelectContent>
                <SelectItem value="כן">כן</SelectItem>
                <SelectItem value="לא">לא</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-end text-right">
            <label>שטח נדרש (מ"ר)</label>
            <Input className="text-right" type="number" min="0" value={area} onChange={(e) => setArea(parseFloat(e.target.value) || 0)} />
          </div>
          <div className="flex flex-col items-end text-right">
            <label>מטרים רצים של פרופילים</label>
            <Input className="text-right" type="number" min="0" value={profileMeters} onChange={(e) => setProfileMeters(parseFloat(e.target.value) || 0)} />
          </div>
          <div className="flex flex-col items-end text-right">
            <label>רווח באחוזים</label>
            <Input className="text-right" type="number" min="0" max="100" value={profitMargin} onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)} />
          </div>
          <div className="flex flex-col items-end text-right">
            <label>מחיר למטר רץ (₪)</label>
            <Input className="text-right" type="number" min="0" value={profilePrice} onChange={(e) => setProfilePrice(parseFloat(e.target.value) || 0)} />
          </div>
        </CardContent>
      </Card>

      <Button className="mt-4 w-full bg-gray-200 text-black" onClick={resetForm}>איפוס</Button>

      <Card className="mt-6">
        <CardContent className="text-right p-6 text-center">
          <h3 className="font-bold mb-4">תוצאות החישוב</h3>
          <p>מס' פלטות נדרש: {sheetsNeeded}</p>
          <p>סה"כ שטח מחושב: {totalCalcArea.toFixed(2)} מ"ר</p>
          <p>מחיר לפי פלטות: ₪{finalMaterialCost.toFixed(2)}</p>
          <p>תוספת גרפיקה: ₪{graphicsCost.toFixed(2)}</p>
          <p>תוספת התקנה: ₪{installationCost.toFixed(2)}</p>
          <p>תוספת פרופילים: ₪{profilesCost.toFixed(2)}</p>
          <p className="font-bold mt-4">סה"כ לפני מע"מ: ₪{totalBeforeVAT.toFixed(2)}</p>
          <p className="text-green-600 font-bold">סה"כ כולל מע"מ: ₪{totalWithVAT.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
}