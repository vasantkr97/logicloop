import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCredentials, postCredentials, deleteCredentials } from "../../apiServices/credentials.api";

// Filter credentials by platform
const getTelegramCredentials = async () => {
  const response = await getCredentials();
  const allCredentials = response.credentials || [];
  return allCredentials.filter((cred: any) => cred.platform === 'telegram');
};

const createTelegramCredential = async (formData: { title: string; botToken: string }) => {
  return await postCredentials({
    title: formData.title,
    platform: 'telegram',
    data: { botToken: formData.botToken }
  });
};

const deleteTelegramCredential = async (id: string) => {
  return await deleteCredentials(id);
};

export function TelegramCredentials() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", botToken: "" });

  const { data: credentials } = useQuery({
    queryKey: ["telegramCredentials"],
    queryFn: getTelegramCredentials,
  });

  const createMutation = useMutation({
    mutationFn: createTelegramCredential,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telegramCredentials"] });
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      setShowForm(false);
      setFormData({ title: "", botToken: "" });
      alert('✅ Telegram credential saved successfully!');
    },
    onError: (error: any) => {
      console.error('Failed to create credential:', error);
      alert(`❌ Failed to save: ${error.response?.data?.msg || error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTelegramCredential,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telegramCredentials"] });
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
    },
  });

  return (
    <div>
      <div className="grid gap-2 md:grid-cols-2">
        {credentials?.map((cred: any) => (
          <div key={cred.id} className="bg-gray-800/50 rounded-lg px-3 py-2.5 flex justify-between items-center hover:bg-gray-800 transition-colors border border-gray-700/50">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white truncate">{cred.title}</h3>
              <p className="text-xs text-gray-500">
                {new Date(cred.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteMutation.mutate(cred.id)}
              className="text-gray-500 hover:text-red-400 transition-colors ml-2 p-1"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-2.5 bg-blue-600/10 rounded-lg hover:bg-blue-600/20 transition-colors flex items-center justify-center text-sm font-medium text-blue-400 border border-dashed border-blue-600/30 hover:border-blue-600/50"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Key
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-2">📱</span>
              New Telegram Credential
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Credential Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., My Telegram Bot"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bot Token *
                </label>
                <input
                  type="password"
                  placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                  value={formData.botToken}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, botToken: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Get your bot token from @BotFather on Telegram
                </p>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-600 hover:border-gray-500 rounded-lg py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!formData.title || !formData.botToken || createMutation.isPending}
                onClick={() => createMutation.mutate(formData)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {createMutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
