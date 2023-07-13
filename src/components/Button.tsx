import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
};
export function Button({ title, ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase {...rest} 
    w="full" 
    h={14} 
    bg="green.700">
      <Text>{title}</Text>
    </ButtonNativeBase>
  );
}
