    import  z  from "zod"

    export const createTaskInput = z.object({
        title: z.string(),
        description: z.string(),
        signature:z.string().optional(),
        amount:z.number(),
        web_Url: z.string().url().optional(),
        github_Url: z.string().url(),
        image_Url:z.string().url(),
        average_Rating:z.number().optional(),
        PaymentSuccess:z.boolean().optional(),
     
        
      });


      export const createValidatorSubmission=z.object({
          comment:z.string(),
            rating:z.number(),
            task_Id:z.number(),
            task_amount:z.number(),

      })

      