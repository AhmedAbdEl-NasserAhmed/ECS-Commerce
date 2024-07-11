"use client";

import { emailRegex } from "@/constants/regx";
import MultiChoiceSelectMenu from "@/ui/MultiChoiceSelectMenu/MultiChoiceSelectMenu";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Controller, useForm } from "react-hook-form";
import { getNames } from "country-list";

function BillingInformation() {
  const {
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const countries = getNames().map((country) => ({
    label: country,
    value: country,
    color: "#666666",
  }));

  return (
    <form className="p-6 bg-white shadow-md w-full md:w-1/2 rounded-md  flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold mb-5">Billings Information</h2>
        <span className="w-full h-1 block bg-[#ed0534] ">&nbsp;</span>
      </div>
      <div className="flex items-center flex-wrap md:flex-nowrap gap-8 ">
        <div className="w-full">
          <Controller
            name={"firstName"}
            control={control}
            defaultValue={""}
            rules={{
              required: "This field is required",
              minLength: {
                value: 4,
                message: "The name should be more than 4 characters ",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                textLabelClass={"font-semibold text-xl"}
                placeholder={"First Name"}
                textlabel={"First Name"}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
        <div className="w-full">
          <Controller
            name={"lastName"}
            control={control}
            defaultValue={""}
            rules={{
              required: "This field is required",
              minLength: {
                value: 4,
                message: "The name should be more than 4 characters ",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Last Name"}
                textlabel={"Last Name"}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
      </div>
      <div className="w-full">
        <Controller
          name={"email"}
          control={control}
          defaultValue={""}
          rules={{
            required: "Please Enter A Valid Email",
            pattern: {
              value: emailRegex,
              message: "Please Enter Valid Email Format",
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
              textLabelClass={"font-semibold text-xl"}
              placeholder={"Email Address"}
              textlabel={"Email Address"}
              field={field}
              formerHelperStyles={{ style: { fontSize: "1rem" } }}
              errors={errors}
              type={"text"}
              variant={"outlined"}
              size={"small"}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name={"country"}
          control={control}
          defaultValue={[
            {
              label: "Egypt",
              value: "Egypt",
              color: "#666666",
            },
          ]}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <MultiChoiceSelectMenu
              disabled={false}
              isMulti={false}
              textLabelClass={"font-semibold text-xl"}
              placeholder={"Country Name "}
              textLabel={"Country Name"}
              name={"country"}
              options={countries}
              field={field}
              errors={errors}
            />
          )}
        />
      </div>
    </form>
  );
}

export default BillingInformation;
