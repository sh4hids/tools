import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Inputs = {
  colorsText: string;
};

const hexColorRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;

export default function ColorsForm() {
  const [colors, setColors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.colorsText?.length > 0) {
      const givenColors = data.colorsText.match(hexColorRegex) ?? [];
      setColors(givenColors);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-4">
        <form
          className="w-full flex gap-4 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Textarea
            rows={4}
            {...register("colorsText", { required: true })}
            placeholder="Type your color hex codes here..."
            className="min-h-[10rem] max-h-[16rem]"
          />
          {errors.colorsText && <span>This field is required</span>}

          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className="grid grid-cols-10 p-4">
        {colors.map((color) => (
          <div
            className="w-20 h-20 flex justify-center items-center border"
            style={{
              backgroundColor: color,
            }}
            key={color}
          >
            {color}
          </div>
        ))}
      </div>
    </div>
  );
}
