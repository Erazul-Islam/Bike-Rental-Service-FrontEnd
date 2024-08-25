
import React from 'react';
import { ReactNode } from 'react';
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form';

type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
};

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
} & TFormConfig;

const BikeForm = ({
    onSubmit,
    children,
    defaultValues,
    resolver,
}: TFormProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }

    if (resolver) {
        formConfig['resolver'] = resolver;
    }

    const methods = useForm(formConfig);

    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        methods.reset();
    };

    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(submit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default BikeForm;
