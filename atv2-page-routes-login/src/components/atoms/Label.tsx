import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label(props: LabelProps){
    return (<label className="block text-sm/6 font-medium text-gray-900" {...props}>
                {props.children}
            </label>)
}