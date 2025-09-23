import React, { useEffect, useState } from "react";
import { useGetStore } from "../hooks/useGetStore";
import { useUpdateStore } from "../hooks/useUpdateStore";
import { useTenant } from "../../../context/TenantContext";
import { useTranslation } from 'react-i18next';

interface StoreProfile {
  profileImage: string | null;
  storeName: string;
  address: string;
  description: string;
  phone: string;
  facebook: string;
  instagram: string;
  tiktok: string;
}

const Settings: React.FC<{}> = ({ }) => {
  const { tenantId } = useTenant();
  const { getStore, loading: loadingStore, error: errorStore } = useGetStore();
  const { updateStore, loading: updating, error: updateError } = useUpdateStore();
  const { t, i18n } = useTranslation();

  const [storeData, setStoreData] = useState<StoreProfile>({
    profileImage: null,
    storeName: "",
    address: "",
    description: "",
    phone: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState<string>(i18n.language || "en");

  useEffect(() => {
    const fetchStore = async () => {
      if (!tenantId) return;
      const data = await getStore(tenantId);
      if (data) {
        setStoreData({
          profileImage: null,
          storeName: data.name || "",
          address: data.address || "",
          description: data.description || "",
          phone: data.phone || "",
          facebook: data.facebookURL || "",
          instagram: data.instagramURL || "",
          tiktok: data.tiktokURL || "",
        });
      }
    };
    fetchStore();
  }, [tenantId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreData((prev) => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!tenantId) return;

    await updateStore(tenantId, {
      name: storeData.storeName,
      address: storeData.address,
      description: storeData.description,
      phone: storeData.phone,
      facebookURL: storeData.facebook,
      instagramURL: storeData.instagram,
      tiktokURL: storeData.tiktok,
    });

    setIsEditing(false);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("appLanguage", selectedLang);
  };

  if (loadingStore) return <p className="text-center mt-10">{t('settings.loading')}</p>;
  if (errorStore) return <p className="text-center text-red-500">Error: {errorStore}</p>;

  return (
    <>
      <div className="max-w-5xl mx-auto mt-2 p-6 bg-white shadow rounded-xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('settings.form.title')}</h2>
        <div className="flex justify-end mb-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {t('settings.form.actions.edit')}
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                disabled={updating}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {updating ? t('settings.form.actions.saving') : t('settings.form.actions.save')}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                {t('settings.form.actions.cancel')}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative">
              <img
                src={
                  storeData.profileImage ||
                  "src/assets/store-icon-logo-illustration-vector.jpg"
                }
                alt="Profile Image"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  +
                </label>
              )}
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              {storeData.storeName || t('settings.form.name')}
            </p>
          </div>

          <div className="md:w-2/3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.form.name')}
              </label>
              <input
                type="text"
                name="storeName"
                value={storeData.storeName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`border p-2 mt-1 rounded-xl w-full border-gray-400 ${!isEditing && "bg-gray-100 cursor-not-allowed"
                  }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.form.address')}
              </label>
              <input
                type="text"
                name="address"
                value={storeData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`border p-2 mt-1 rounded-xl w-full border-gray-400 ${!isEditing && "bg-gray-100 cursor-not-allowed"
                  }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.form.description')}
              </label>
              <textarea
                name="description"
                value={storeData.description}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`border p-2 mt-1 rounded-xl w-full border-gray-400 ${!isEditing && "bg-gray-100 cursor-not-allowed"
                  }`}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.form.phone')}
              </label>
              <input
                type="text"
                name="phone"
                value={storeData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`border p-2 mt-1 rounded-xl w-full border-gray-400 ${!isEditing && "bg-gray-100 cursor-not-allowed"
                  }`}
                placeholder="+591 12345678"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["facebook", "instagram", "tiktok"].map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {platform}
                  </label>
                  <input
                    type="text"
                    name={platform}
                    value={storeData[platform as keyof StoreProfile] || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`border p-2 mt-1 rounded-xl w-full border-gray-400 ${!isEditing && "bg-gray-100 cursor-not-allowed"
                      }`}
                    placeholder={`${platform} URL`}
                  />
                </div>
              ))}
            </div>

            {updateError && (
              <p className="text-red-500 mt-2">Error: {updateError}</p>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-2 p-6 bg-white shadow rounded-xl mb-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-gray-800">{t("settings.language.title")}</h3>
          <p className="text-gray-600 mb-4">{t("settings.language.description")}</p>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border p-2 rounded-xl w-60 border-gray-400"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Settings;
