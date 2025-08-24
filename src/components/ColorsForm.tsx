import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  colorsText: string;
};

const hexColorRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;

export default function ColorsForm() {
  const [colors, setColors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.colorsText?.length > 0) {
      const givenColors = data.colorsText.match(hexColorRegex) ?? [];
      setColors(givenColors);
      console.log(givenColors);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          {/* include validation with required or other standard HTML validation rules */}
          <textarea {...register("colorsText", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.colorsText && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div className="flex">
        {colors.map((color) => (
          <div
            className="w-20 h-20 flex justify-center items-center"
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
