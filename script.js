// --- DATABASE PERTANYAAN ---
// Anda bisa menambahkan lebih banyak pertanyaan di sini
const questions = [
    {
        code: `let x = 5;\nx = x + 3;\nconsole.log(x);`,
        question: "Berapakah nilai akhir dari `x`?",
        choices: ["5", "3", "8", "undefined"],
        correctAnswer: "8"
    },
    {
        code: `const numbers = [10, 20, 30];\nconsole.log(numbers[1]);`,
        question: "Elemen apa yang akan ditampilkan?",
        choices: ["10", "20", "30", "null"],
        correctAnswer: "20"
    },
    {
        code: `for (let i = 0; i < 3; i++) {\n  console.log("Hello");\n}`,
        question: "Berapa kali kata 'Hello' akan dicetak?",
        choices: ["2", "3", "4", "1"],
        correctAnswer: "3"
    },
    {
        code: `function multiply(a, b) {\n  return a * b;\n}\nconsole.log(multiply(4, 5));`,
        question: "Apa output dari kode ini?",
        choices: ["9", "20", "function", "1"],
        correctAnswer: "20"
    }
];

// --- ELEMEN DOM ---
const codeSnippetEl = document.getElementById('code-snippet');
const questionEl = document.getElementById('question');
const choicesContainerEl = document.getElementById('choices-container');
const feedbackEl = document.getElementById('feedback');
const nextButtonEl = document.getElementById('next-button');

// --- STATE PERMAINAN ---
let currentQuestionIndex = 0;
let answered = false;

// --- FUNGSI ---

// Fungsi untuk memuat dan menampilkan pertanyaan saat ini
function loadQuestion() {
    answered = false;
    const currentQuestion = questions[currentQuestionIndex];

    codeSnippetEl.textContent = currentQuestion.code;
    questionEl.textContent = currentQuestion.question;

    choicesContainerEl.innerHTML = ''; // Kosongkan pilihan sebelumnya
    feedbackEl.textContent = '';
    nextButtonEl.style.display = 'none';

    // Buat tombol untuk setiap pilihan jawaban
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, choice));
        choicesContainerEl.appendChild(button);
    });
}

// Fungsi yang dijalankan saat pengguna memilih jawaban
function selectAnswer(button, selectedChoice) {
    if (answered) return; // Jangan lakukan apa-apa jika sudah dijawab
    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedChoice === currentQuestion.correctAnswer;

    if (isCorrect) {
        button.classList.add('correct');
        feedbackEl.textContent = 'Jawaban Benar! 🎉';
        feedbackEl.style.color = 'var(--correct-color)';
    } else {
        button.classList.add('incorrect');
        feedbackEl.textContent = `Salah. Jawaban yang benar adalah ${currentQuestion.correctAnswer}`;
        feedbackEl.style.color = 'var(--incorrect-color)';

        // Tampilkan juga jawaban yang benar
        const correctButton = Array.from(choicesContainerEl.children).find(
            btn => btn.textContent === currentQuestion.correctAnswer
        );
        if (correctButton) {
            correctButton.classList.add('correct');
        }
    }

    // Nonaktifkan semua tombol pilihan
    Array.from(choicesContainerEl.children).forEach(btn => {
        btn.disabled = true;
    });

    nextButtonEl.style.display = 'block'; // Tampilkan tombol 'Lanjut'
}

// Event listener untuk tombol 'Lanjut'
nextButtonEl.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Permainan selesai
        document.getElementById('game').innerHTML = `
            <h1 class="title">Permainan Selesai!</h1>
            <p class="description">Anda telah menyelesaikan semua pertanyaan. Refresh halaman untuk bermain lagi.</p>
        `;
    }
});

// --- INISIALISASI PERMAINAN ---
// Muat pertanyaan pertama saat halaman dibuka
loadQuestion();