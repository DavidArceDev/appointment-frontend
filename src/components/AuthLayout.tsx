
import type { ReactNode } from 'react'

type AuthLayoutProps = {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="auth-container">
            <section className="auth-branding">
                <div className="auth-brand-copy">
                    <p className="auth-brand-name">Vínculo y proceso</p>

                    <h1>Un espacio para tu bienestar</h1>

                    <p className="auth-brand-description">
                        Organiza tus atenciones y mantén el seguimiento
                        de tu proceso en un solo lugar.
                    </p>
                </div>
            </section>

            <section className="auth-form-area">
                {children}
            </section>
        </main>
    )
}
