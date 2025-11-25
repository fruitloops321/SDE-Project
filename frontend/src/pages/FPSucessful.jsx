
import "/src/styles/fpSuccessful.css";

export default function ForgetPassword() {

    return (
        <div className="fp-container">
            {/* Aurora Background */}
            <div className="fp-aurora"></div>

            {/* Right Card */}
            <div className="fp-card">
                <div className="fp-header">
                    <h2 className="fp-title">
                        Reset your <br />
                        <span>Password</span>
                    </h2>

                    <p className="fp-subtitle">
                        A link has been sent successfully to your account! Please check your email
                        address and follows the instruction given.
                    </p>
                </div>

                {/* Footer Link */}
                <p className="fp-footer">
                    Have a <span className="fp-footer-Savlo">Savlo </span>account already?{" "}
                    <span className="fp-link">Login</span>
                </p>
            </div>
        </div>
    );
}
