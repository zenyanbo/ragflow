import { NextLLMSelect as LlmProvider } from '@/components/llm-select/next';
import { NumberInput } from '@/components/ui/number-input';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTranslate } from '@/hooks/common-hooks';
import { IOperatorForm } from '@/pages/agent/interface';
import { useForm } from 'react-hook-form';
import { initialMultiQueryOptimizerValues } from '../../constant';

const MultiQueryOptimizerForm = ({ onValuesChange, id,form}: IOperatorForm) => {
  const { t } = useTranslate();

  const llmForm = useForm({
    defaultValues: initialMultiQueryOptimizerValues,
  });

  return (
    <Form {...llmForm}>
      <FormField
        control={llmForm.control}
        name="llm_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('flow.llm')}</FormLabel>
            <LlmProvider
              value={field.value}
              onChange={field.onChange}
            ></LlmProvider>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={llmForm.control}
        name="output_count"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('flow.multiQueryOptimizer.outputCount')}</FormLabel>
            <NumberInput {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default MultiQueryOptimizerForm;