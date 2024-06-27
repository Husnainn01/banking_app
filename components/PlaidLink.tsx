import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOptions } from 'react-plaid-link'
import { useCallback, useState } from 'react'
import { StyledString } from 'next/dist/build/swc'
import { useRouter } from 'next/navigation'
import { PlaidLinkOnSuccess } from 'react-plaid-link'
import { usePlaidLink } from 'react-plaid-link'
import { createLinkToken } from '@/lib/actions/user.actions'
import { exchangePublicToken } from '@/lib/actions/user.actions'

const PlaidLink = ({user, variant}: PlaidLinkProps) => {
    
    const router = useRouter();

    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }
        getLinkToken();
    }, [user]);

    const onSuccess = useCallback <PlaidLinkOnSuccess>(async (public_token: string) => {
       await exchangePublicToken({
        publicToken: public_token,
        user,
    });

    router.push('/');
    }, [user])
    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);

  return (
    <div>
      <>
      {variant === 'primary' ? (
        <Button
        onClick={() => open()}
        disabled={!ready}
        className='plaidlink-primary'>
            Connect Bank
        </Button>
      ):variant === 'ghost' ? (
            <Button>
                Connect Bank
            </Button>
        ) : (
            <Button>
                Connect Bank
            </Button>
        )
      }
      </>
    </div>
  )
}

export default PlaidLink
