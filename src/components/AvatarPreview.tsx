import React from 'react';
import { User } from 'lucide-react';

interface AvatarPreviewProps {
  avatarUrl?: string;
  onAvatarChange?: (url: string) => void;
  avatarSize?: 'small' | 'medium' | 'large';
  isRounded?: boolean;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({ 
  avatarUrl, 
  onAvatarChange,
  avatarSize = 'large',
  isRounded = false 
}) => {
  const containerClasses = {
    small: 'w-24 h-24',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  const iconSizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const handleFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onAvatarChange) {
        const imageUrl = URL.createObjectURL(file);
        onAvatarChange(imageUrl);
      }
    };

    input.click();
  };

  return (
    <div 
      onClick={handleFileInput}
      className={`
        flex items-center justify-center cursor-pointer
        bg-gradient-to-br from-purple-600 to-blue-500
        hover:opacity-90 transition-all duration-200
        ${containerClasses[avatarSize]}
        ${isRounded ? 'rounded-full' : 'rounded-lg'}
        ${avatarSize === 'large' ? 'shadow-lg' : 'shadow-md'}
      `}
    >
      {avatarUrl ? (
        <div className={`
          relative w-full h-full 
          ${isRounded ? 'rounded-full overflow-hidden' : 'rounded-lg'}
        `}>
          <img 
            src={avatarUrl}
            alt="Avatar"
            className={`
              w-full h-full object-cover
              ${isRounded ? 'rounded-full' : 'rounded-lg'}
            `}
            onError={(e) => {
              e.currentTarget.src = ''; 
              if (onAvatarChange) {
                onAvatarChange('');
                URL.revokeObjectURL(avatarUrl);
              }
            }}
          />
        </div>
      ) : (
        <User className={`${iconSizes[avatarSize]} text-white`} />
      )}
    </div>
  );
};

export default AvatarPreview;