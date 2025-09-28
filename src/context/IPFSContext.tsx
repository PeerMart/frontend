import { unixfs, type UnixFS } from '@helia/unixfs';
import { createHelia } from 'helia';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface IpfsContextType {
  upload: (file: File) => Promise<string>;
}

const IpfsContext = createContext<IpfsContextType>({
  upload: async () => ''
});

export const useIpfs = () => useContext(IpfsContext);

export const IpfsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fs, setFs] = useState<UnixFS | null>(null);

  const upload = async (file: File) => {
    return `${await fs!.addFile({ path: file.name, content: new Uint8Array(await file.arrayBuffer()) })}`;
  };

  useEffect(() => {
    (async () => {
      setFs(unixfs(await createHelia()));
    })();
  }, []);

  return <IpfsContext.Provider value={{ upload }}>{children}</IpfsContext.Provider>;
};
