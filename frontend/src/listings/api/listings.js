export const getListings = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings`
    );
  return await res.json();
};

export const getUserListings = async ({queryKey}) => {
  const userInfo = queryKey[1];
    const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/user-listings/${userInfo.seller}`,
    {
      headers: {
        'Accept': 'application/json',
        Authorization: 'Bearer ' + userInfo.token
      }
    }
    );
  return await res.json();
};

export const createListing = async ({title, price, seller, phone, description, image, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        title,
        price,
        seller,
        phone,
        description,
        image
      })
    }
  );

  return await res.json();
};

export const deleteListing = async ({id, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );

  return await res.json();
};

export const editListing = async ({id, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        title,
        price,
        description
      })
    }
  );
  return await res.json();
};