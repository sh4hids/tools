import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from '@/components/ui/copy-button';

type Inputs = {
  datesText: string;
};

const hexColorRegex = /\b\d{13}\b/g;

export default function DatesForm() {
  const [currentDate] = useState(Date.now());
  const [dates, setDates] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.datesText?.length > 0) {
      const givenDates = data.datesText.match(hexColorRegex) ?? [];
      setDates(givenDates);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-4 pt-6">
      <div className="">
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Textarea
            rows={4}
            {...register('datesText', { required: true })}
            placeholder="Type your dates in milliseconds here..."
            className="max-h-[16rem] min-h-[10rem]"
          />
          {errors.datesText && <span>This field is required</span>}

          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className="grid grid-cols-1 p-4 *:rounded-md">
        <div
          className="flex h-auto w-full flex-col items-center justify-center gap-2 border py-4"
          key={currentDate}
        >
          <p> {`${new Date(currentDate)}`}</p>
          <p>
            {`${currentDate}`}
            <CopyButton
              content={`${currentDate}`}
              variant="outline"
              size="sm"
              className="ml-2"
            />
          </p>
          <p>
            {`${new Date(currentDate).toISOString()}`}
            <CopyButton
              content={new Date(currentDate).toISOString()}
              variant="outline"
              size="sm"
              className="ml-2"
            />
          </p>
          <p>
            {' '}
            <pre className="inline">new Date()</pre>
            <CopyButton
              content={`new Date()`}
              variant="outline"
              size="sm"
              className="ml-2"
            />
          </p>
          <p>
            {' '}
            <pre className="inline">Date.now()</pre>
            <CopyButton
              content={`Date().now()`}
              variant="outline"
              size="sm"
              className="ml-2"
            />
          </p>
        </div>
        {dates.map((date) => (
          <div
            className="flex h-auto w-full flex-col items-center justify-center border py-2"
            key={date}
          >
            <p> {`${new Date(+date)}`}</p>
            <p>
              {' '}
              {`${new Date(+date).toISOString()}`}
              <CopyButton
                content={new Date(+date).toISOString()}
                variant="outline"
                size="sm"
                className="ml-2"
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
