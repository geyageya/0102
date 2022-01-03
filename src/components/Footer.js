import styles from '../styles/Home.module.css'
import Image from 'next/image'

export function Footer() {
    const footer ={
        textAlign: "center"
      }
      return(
    
        <p style={footer}>©<a href="https://ondoku3.com/">ondoku3.com</a>(声:<a href="https://ondoku3.com/">音読さん)</a></p>
      )
    }

//   return (
   
//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
   
//   )
// }
