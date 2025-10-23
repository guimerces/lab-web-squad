import Checkbox from "../atoms/Checkbox";
import Label from "../atoms/Label";

type LabeledCheckboxProps = React.ComponentProps<typeof Checkbox> & {label: string};

export default function LabeledCheckbox({label, ...checkboxProps}: LabeledCheckboxProps){
    return (
            <Label className="flex items-center gap-2 cursor-pointer text-gray-900">
                <Checkbox {...checkboxProps} />
                <span>{label}</span>
            </Label>
    );
}