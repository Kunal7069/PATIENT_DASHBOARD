process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const sentence = "Good evening senior,I Kunal Jain, currently pursuing Btech from Institute of Engineering and Technology, Lucknow. I am looking for an internship as a full stack developer. I have been working as a SDE intern since last 1.5 years, Recently I also won SIH'23 which is a hackathon organised by central government of India every year. I am attaching my resume for your reference.I hope you are fine and working hard for our college placements. I hope your support will be always provided to us and our training and placement cell of our college."; // Define your string
var str=`Draft a follow-up concise specific summary of the email in a brief narrative format and 
                  paragraph in directive speach: ${sentence}`;
const runFetch = async () => {
  try {
    const response = await fetch(
      'https://ab4d254740f884ca1880358531f9e89a-21771294.ap-south-1.elb.amazonaws.com/fastapi/query',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: str,
          max_length: 50
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

runFetch();
