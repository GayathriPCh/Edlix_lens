import { useLogin, useLogout, useSession, SessionType, useProfilesManaged, ProfileId } from "@lens-protocol/react-web";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function App() {
  const { execute: login, loading: loginLoading, error: loginError } = useLogin();
  const { execute: logout, loading: logoutLoading, error: logoutError } = useLogout();
  const { data: session, loading: sessionLoading } = useSession();

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  const { data: profiles, loading: profilesLoading } = useProfilesManaged({
    for: address || "",
    includeOwned: true
  });

  const handleLogin = async (profileId?: string) => {
    if (address) {
      try {
        const result = await login({ address, profileId: profileId as ProfileId });
        if (result.isFailure()) {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (sessionLoading) return <p>Loading session...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Lens React SDK App</h1>

      {isConnected ? (
        <>
          <p>Wallet Connected: {address}</p>
          {session?.type === SessionType.WithProfile ? (
            <>
              <p>✅ Logged in with Lens Profile: {session.profile.handle?.fullHandle}</p>
              <button onClick={handleLogout} disabled={logoutLoading}>
                {logoutLoading ? "Logging Out..." : "Logout from Lens"}
              </button>
            </>
          ) : session?.type === SessionType.JustWallet ? (
            <p>Logged in with wallet only</p>
          ) : (
            <>
              {profilesLoading ? (
                <p>Loading profiles...</p>
              ) : profiles && profiles.length > 0 ? (
                profiles.map(profile => (
                  <button key={profile.id} onClick={() => handleLogin(profile.id)} disabled={loginLoading}>
                    Login as {profile.handle?.fullHandle}
                  </button>
                ))
              ) : (
                <button onClick={() => handleLogin()} disabled={loginLoading}>
                  {loginLoading ? "Authenticating..." : "Login to Lens"}
                </button>
              )}
            </>
          )}
          <br />
          <button onClick={() => disconnect()}>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={() => connect({ connector: injected() })}>Connect Wallet</button>
      )}
      {(loginError || logoutError) && <p style={{ color: 'red' }}>An error occurred. Please try again.</p>}
    </div>
  );
}
