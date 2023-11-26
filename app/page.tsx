'use client'

import { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [divTexts, setDivTexts] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [scrollToEnd, setScrollToEnd] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputText.trim() !== '') {
      setDivTexts((prevDivTexts) => [...prevDivTexts, inputText]);
      setInputText('');
      setScrollToEnd(true); // Defina a flag para rolar para o final após adicionar uma nova mensagem
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const fetchMoreData = () => {
    setHasMore(false);
  };

  useEffect(() => {
    // Rola para o final quando scrollToEnd é verdadeiro
    if (scrollToEnd) {
      const messageContainer = document.getElementById("message-container");
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
        setScrollToEnd(false); // Redefina a flag após rolar para o final
      }
    }
  }, [scrollToEnd]);

  return (
    <div className="flex flex-col items-center h-screen">
      <div className='bg-[#2e3136] w-[750px] p-3 border-b-[1.5px] t-0 border-[#28292e]'>
        <div className='flex items-center'>
          <p className='text-[#707070] pl-3 text-[26px]'>#</p>
          <p className='pl-5 text-white font-bold '>🍓-general-chat</p>
          <p className='pl-5 ml-5 border-l-[1.5px] border-white/10 text-[14px] text-[#9c9c9c]'>chat para conversar</p>
        </div>
      </div>
      <div
        id="message-container"
        className="flex flex-col items-left overflow-y-auto max-h-2/3-screen rounded p-1"
      >
        <InfiniteScroll
          dataLength={divTexts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Carregando...</h4>}
          className='scrollbar-w-12 w-[720px] max-w-[100%] break-words'
        >
          {divTexts.map((text, index) => (
            <div key={index} className="mb-3 p-2 flex hover:bg-[#303338]/40">
              <div id="message-container" className='w-12 rounded-full h-12 flex justify-center items-center border-[2px] border-[#7472ff] text-black'>
                <Image
                  src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f86e4d6a-8e28-48b1-9977-a9e82ce6dadc/deaij8z-6a67c4ec-42ca-41c9-b37e-9141640f5255.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y4NmU0ZDZhLThlMjgtNDhiMS05OTc3LWE5ZTgyY2U2ZGFkY1wvZGVhaWo4ei02YTY3YzRlYy00MmNhLTQxYzktYjM3ZS05MTQxNjQwZjUyNTUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sW5GeqAe2oi81M_pZLJ81WG-7kUzGCSbSaMtdP0nmvg'
                  width={36}
                  height={36}
                  alt='aa'
                  unoptimized

                  className='rounded-full'
                />
              </div>
              <div className='pl-4 flex flex-col'>
                <div className='flex flex-col items-start'>
                  <p className='font-semibold text-[#ffb172]'>Picard</p>
                  <p className='text-[12px] pb-2 text-[#c2c2c2]'>Hoje às 16:30</p>
                </div>
                <div>
                  <p className='w-[620px] font-normal text-[14px] max-w-[100%] break-words'>{text}</p>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <div className="flex w-[750px] mb-5 justify-center items-center p-4">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Digite algo..."
          onKeyDown={handleKeyPress}
          className="py-2 px-5 text-white placeholder-[#6f737c] outline-none rounded-[5px] bg-[#4a4c51] w-[700px] w-full"
        />
      </div>
    </div>
  );
};

export default Home;