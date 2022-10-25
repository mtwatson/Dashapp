import * as Yup from 'yup';

const FicSchemas = Yup.object().shape({
    ficName: Yup.string().required('Fic name is required'),
    ficCompletion: Yup.number()
      .min(0, 'Completion is too short - should be 0 at the lowest')
      .max(100, 'Completion is too high - should be 100 at the highest')
      .required('Completion amount is required'),
    ficPriority: Yup.number().min(1, 'Priority must be 1 or greater').required('The priority of the fic is required'),
    ficCategory: Yup.string().required('The fic category is required'),
    ficStatus: Yup.string().required('The fic status is required'),
  });

export default FicSchemas;