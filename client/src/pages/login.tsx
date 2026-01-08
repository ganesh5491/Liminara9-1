import { Card, CardContent } from '@/components/ui/card';
import OTPLogin from '@/components/otp-login';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTarget = sessionStorage.getItem('redirectAfterLogin');
      if (redirectTarget && redirectTarget !== '/login') {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectTarget);
      } else {
        const checkoutProductId = sessionStorage.getItem('checkoutProductId');
        if (checkoutProductId) {
          navigate(`/product/${checkoutProductId}?checkout=true`);
        } else {
          navigate('/');
        }
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen w-full bg-background">
      <OTPLogin />
    </div>
  );
}
