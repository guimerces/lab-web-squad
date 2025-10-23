import Label from "../atoms/Label";
import Input from "../atoms/Input";

type LabeledInputProps = React.ComponentProps<typeof Input> & {label: string};

export default function LabeledInput({label, ...inputProps}: LabeledInputProps) {
    return (<div>
        <Label>{label}</Label>
        <Input {...inputProps} />
    </div>
    );
}

