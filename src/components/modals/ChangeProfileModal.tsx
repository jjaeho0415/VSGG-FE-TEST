import getNicknameCheck, { IGetNickNameCheckType } from '@/api/getNicknameCheck';
import { useMutation } from '@tanstack/react-query';
import React, { SetStateAction, useRef, useState } from 'react';

interface ChangeProgileModalProps {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  userName: string;
  userProfileImage: string;
}

function ChangeProfileModal({
  setIsModalOpen,
  userName,
  userProfileImage,
}: ChangeProgileModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSameNickName, setIsSameNickName] = useState<boolean>(false);
  const [isNickNameCheck, setIsNickNameCheck] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(userProfileImage);
  const [nickName, setNickName] = useState<string>(userName);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue !== nickName) {
      setIsSameNickName(true);
      setIsNickNameCheck(false);
    }
    setNickName(inputValue);
    inputValue.length > 1 && inputValue.length <= 20
      ? setErrorMessage('')
      : setErrorMessage('공백 없이 2글자 이상, 20글자 이하로 입력하세요.');
  };

  const { mutate: nicknameCheck } = useMutation({
    mutationFn: () => getNicknameCheck(nickName),
    mutationKey: ['nickNameCheck', isSameNickName],
    onSuccess: (data: IGetNickNameCheckType) => {
      if (data.nicknameCheck) {
        setErrorMessage('중복된 닉네임입니다.');
      } else {
        setErrorMessage('사용 가능한 닉네임입니다.');
        setIsSameNickName(false);
        setIsNickNameCheck(true);
      }
    },
    onError: (error) => console.log(error),
  });

  const handleCheckNickname = () => {
    if (userName === nickName) {
      return;
    }
    if (nickName === '') {
      return;
    }
    if (errorMessage !== '') {
      return;
    }
    nicknameCheck();
  };

  const handleDeleteImage = () => {
    if (profileImage === '') {
      return;
    }
    setProfileImage('https://ssl.pstatic.net/static/pwe/address/img_profile.png');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // 닉네임, 프로필 이미지 수정하는 api 호출
    setIsModalOpen(false);
  };

  return (
    <div
      className='flex flex-col relative bg-white w-[560px] h-[600px] rounded-[18px] py-[40px] gap-[50px] px-[100px]'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='text-center font-semibold text-[24px]'>프로필 변경</div>
      <div className='flex flex-col gap-[40px]'>
        <div>
          <div className='flex gap-3 items-center mb-[10px]'>
            <p className='font-semibold text-[22px] text-[#555555]'>닉네임</p>
            <p className='font-medium text-[14px] text-[#909090]'>
              닉네임은 7일에 한번만 변경할 수 있습니다.
            </p>
          </div>
          <div className='flex flex-col gap-[10px] px-[25px]'>
            <div className='flex gap-3 items-center justify-center'>
              <input
                type='text'
                className='w-[207px] px-[2px] font-medium text-[22px] text-[#555555] border-b-2 border-gray focus:outline-none'
                value={nickName}
                placeholder='닉네임을 입력하세요.'
                onChange={handleChangeNickname}
              />
              <button
                className='bg-white rounded-[5px] border border-gray justify-center items-center text-[16px] font-medium text-[#333333] px-[10px] py-[5px]'
                onClick={handleCheckNickname}
              >
                중복확인
              </button>
            </div>
            <div className='text-[14px] text-[#8A1F21] flex items-center pl-[15px]'>
              {errorMessage}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <div className='font-semibold text-[22px] text-[#555555]'>프로필 이미지</div>
          <div className='flex gap-[15px] pl-[10px]'>
            <img
              src={profileImage}
              alt='profileImage'
              className='w-[145px] h-[145px] rounded-full'
            />
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <p className='text-[14px] font-medium text-[#909090]'>파일 형식 : jpg, jpeg, png</p>
                <p className='text-[14px] font-medium text-[#909090]'>파일 크기 : 2MB 이내</p>
              </div>
              <div className='flex gap-[10px]'>
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button
                  className='border border-gray rounded-[5px] text-[#333333] bg-white w-[98px] h-[32px]'
                  onClick={handleChangeImage}
                >
                  사진 업로드
                </button>

                <button
                  className='border border-gray rounded-[5px] text-[#333333] bg-white w-[50px] h-[32px]'
                  onClick={handleDeleteImage}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-[15px] justify-center'>
          <button
            className='rounded-[5px] w-[150px] h-[57px] justify-center items-center text-[#8A1F21] bg-white text-[24px] font-semibold border border-[#8A1F21]'
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            className='rounded-[5px] w-[150px] h-[57px] justify-center items-center bg-[#8A1F21] text-white text-[24px] font-semibold border border-[#8A1F21]'
            onClick={handleSave}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfileModal;
