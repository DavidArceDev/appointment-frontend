
import type { InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: LucideIcon
}

export default function AuthInput({
    icon: Icon,
    ...props
}: AuthInputProps) {
    return (
        <div className="auth-input">
            <Icon size={19} strokeWidth={1.7} />
            <input {...props} />
        </div>
    )
}
