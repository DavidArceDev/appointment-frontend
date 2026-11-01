
import type { ReactNode } from 'react'

type AuthLayoutProps = {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="auth-container">
            {/* PANEL IZQUIERDO */}
            <section className="auth-branding">

                <div className="auth-brand-name">
                    <img
                        src="/src/assets/logov5.png"
                        alt="Vínculo y Proceso"
                    />
                </div>

                <h1>Un espacio para tu bienestar</h1>

                <p className="auth-brand-description">
                    Organiza tus atenciones y mantén el seguimiento
                    de tu proceso en un espacio seguro y confiable.
                </p>

            </section>

            {/* PANEL DERECHO */}
            <section className="auth-form-area">
                {children}
            </section>

        </main>
    )
}
