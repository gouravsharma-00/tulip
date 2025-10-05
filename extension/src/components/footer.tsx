export default function Footer({message} : {message: string}) {
    return(
        <>
            <p id='message'>{message}</p>
            <hr />
            <p className="read-the-docs">Made with ❤️ by Gourav</p>
        </>
    )
}