import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

const priceList = {
  step0: {
    range: "0-50",
    limit: 50,
    price: 4.63,
  },
  step1: {
    range: "0-75",
    limit: 75,
    price: 5.26,
  },
  step2: {
    range: "76-200",
    limit: 125,
    price: 7.2,
  },
  step3: {
    range: "201-300",
    limit: 100,
    price: 7.59,
  },
  step4: {
    range: "301-400",
    limit: 100,
    price: 8.02,
  },
  step5: {
    range: "401-600",
    limit: 200,
    price: 12.67,
  },
  step6: {
    range: "600 >",
    limit: Number.MAX_SAFE_INTEGER,
    price: 14.61,
  },
};

type PriceTable = { [key: string]: { unit: number; price: number } };

function getPriceTable(unit: number) {
  let totalUnit = unit;
  let table: PriceTable = {};

  for (const [key, value] of Object.entries(priceList)) {
    if (key === "step0" && totalUnit <= value.limit) {
      table[value.range] = {
        unit: totalUnit,
        price: +(totalUnit * value.price).toFixed(2),
      };

      return table;
    } else if (key !== "step0" && totalUnit > 0) {
      table[value.range] = {
        unit: totalUnit > value.limit ? value.limit : totalUnit,
        price: +(
          totalUnit > value.limit
            ? value.limit * value.price
            : totalUnit * value.price
        ).toFixed(2),
      };
      totalUnit = totalUnit > value.limit ? totalUnit - value.limit : 0;
    }
  }

  return table;
}

export default function ElectricityBillCalculator() {
  const [unit1, setUnit1] = useState<number | null>(null);
  const [unit2, setUnit2] = useState<number | null>(null);
  const [priceTable, setPriceTable] = useState<PriceTable>({});

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const unit = Number(unit2) - Number(unit1);

    const table = getPriceTable(unit);

    setPriceTable(table);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="mt-10">
          <h1 className="pb-4">Electricity Bill Calculator</h1>
          <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
            <Input
              name="unit2"
              value={unit2 ?? ""}
              type="number"
              placeholder="Current unit..."
              onChange={(e) => setUnit2(+e.target.value)}
            />
            <Input
              name="unit1"
              value={unit1 ?? ""}
              type="number"
              placeholder="Previous unit..."
              onChange={(e) => setUnit1(+e.target.value)}
            />
            <Button type="submit">Calculate</Button>
          </form>
          <div className="price">
            {Object.keys(priceTable).length > 0 ? (
              <>
                <table className="w-full border *:border ">
                  <thead>
                    <tr className="*:border *:p-2">
                      <th>Range</th>
                      <th>Unit</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(priceTable).map(([key, value]) => (
                      <tr key={key} className="*:border *:p-2">
                        <td>{key}</td>
                        <td>{value.unit}</td>
                        <td>{value.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="*:border *:p-2">
                      <td>Total</td>
                      <td>
                        {Object.values(priceTable)
                          .map((v) => v.unit)
                          .reduce((a, c) => a + c, 0)}
                      </td>
                      <td>
                        {Object.values(priceTable)
                          .map((v) => v.price)
                          .reduce((a, c) => a + c, 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </>
            ) : (
              <p>Fill and click Calculate</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
