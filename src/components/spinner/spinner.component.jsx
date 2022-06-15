import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";


//spinner to show when loading components
export const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};
