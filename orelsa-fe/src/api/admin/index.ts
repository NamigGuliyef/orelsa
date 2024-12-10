import axios from "axios";
import { getServerSession } from "next-auth";
import toast from "react-hot-toast";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/dashboard/homeNewCollection";
const BASE_URL_SUPPORT =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/dashboard/";
const ADMIN_BE_URL = "http://localhost:9089/admin";
const GUEST_BE_URL = "http://localhost:9089/guest";
// API

type ContactDetails = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

type Subscribe = {
  email: string;
};

export const postAdminDashboardHomeNewCollection = async () => {
  const { data } = await axios.post(BASE_URL + "homeNewCollection/");
  return data;
};

export const postContactUsGuest = async (contactDetails: ContactDetails) => {
  try {
    const response = await axios.post(GUEST_BE_URL + "/contact-us", {
      name: contactDetails.name,
      email: contactDetails.email,
      subject: contactDetails.subject,
      message: contactDetails.message,
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("Your message has been sent successfully!");
      return true;
    }

    return false;
  } catch (err: any) {
    console.error(err);
    toast.error(
      err.response?.data?.message ||
        "An error occurred while sending your message."
    );
    return false;
  }
};

export const postSubscribeGuest = async (email: Subscribe) => {
  try {
    const response = await axios.post(GUEST_BE_URL + "/subscribe", email);

    if (response.status === 200 || response.status === 201) {
      toast.success("Your message has been sent successfully!");
      return true;
    }

    return false;
  } catch (err: any) {
    console.error(err);
    toast.error(
      err.response?.data?.message ||
        "An error occurred while sending your message."
    );
    return false;
  }
};

export const updateProduct = async (editingProduct: any) => {
  let _link = ADMIN_BE_URL + "/dashboard/product/" + editingProduct._id;
  const token = localStorage.getItem("token");

  const { data } = await axios.patch(_link, editingProduct, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAdminDashboardHomeNewCollection = async (id: string) => {
  const session = await getServerSession();
  const { data } = await axios.get(BASE_URL + "homeNewCollection/" + id, {
    headers: {
      Authorization: "Bearer " + session?.user?.email,
    },
  });
  return data;
};

// export const patchAdminDashboardHomeNewCollectionById = async (
//   id: string,
//   title: string,
//   photo: string
// ) => {
//   await axios
//     .patch(BASE_URL + "homeNewCollection/" + id, title, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: "Bearer " + photo,
//       },
//     })
//     .then((res) => {
//       if (res.status === 200 || res.status === 201) {
//         toast.success("ss"); //??????????????????????????
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       toast.error(err.response?.data?.message || "error");
//     });
// };

export const getAdminDashboardHomeNewCollectionById = async (id: string) => {
  const { data } = await axios.get(BASE_URL + "homeNewCollection/" + id);
  return data;
};

export const getAllProductsAdmin = async () => {
  const url = "http://localhost:9089/admin/dashboard/product";

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      console.error("Status code:", error.response?.status);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const deleteProduct = async (productId: string) => {
  const token = localStorage.getItem("token");
  const url = "http://localhost:9089/admin/dashboard/product";

  try {
    const response = await axios.delete(`${url}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getHomeNewCollection = async () => {
  const url = "http://localhost:9089/admin/dashboard/homeNewCollection";

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const updateNewCollection = async (editingNewCollection: any) => {
  let _link =
    ADMIN_BE_URL + "/dashboard/homeNewCollection/" + editingNewCollection.id;
  const token = localStorage.getItem("token");
  delete editingNewCollection.id;

  const { data } = await axios.patch(_link, editingNewCollection, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteNewCollection = async (productId: string) => {
  const token = localStorage.getItem("token");
  const url = "http://localhost:9089/admin/dashboard/homeNewCollection";

  try {
    const response = await axios.delete(`${url}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getContactList = async () => {
  const url = "http://localhost:9089/admin/dashboard/contact";

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const getSubscribersList = async () => {
  const url = "http://localhost:9089/admin/dashboard/subscribe";

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const getBrowseRangeList = async () => {
  const url = "http://localhost:9089/admin/dashboard/homeBrowseRange";

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

// export const postAdminDashboardHomeBrowseRange = async (
//   description: string,
//   photo: string
// ) => {
//   // if(){}
// };

export const deleteHomeBrowseRange = async (productId: string) => {
  const token = localStorage.getItem("token");
  const url = "http://localhost:9089/admin/dashboard/homeBrowseRange";

  try {
    const response = await axios.delete(`${url}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const updatehomeBrowseRange = async (editingProduct: any) => {
  let _link = ADMIN_BE_URL + "/dashboard/homeBrowseRange/" + editingProduct._id;
  const token = localStorage.getItem("token");

  const { data } = await axios.patch(_link, editingProduct, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
