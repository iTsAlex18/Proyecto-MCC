interface ContainerPageProps {
    children: React.ReactNode
}

const ContainerPage = (props: ContainerPageProps) => {
    const { children } = props

    return (
        <div className="min-h-[100vh] h-full bg-no-repeat bg-gradient-cover2">
            {children}
        </div>
    );
}

export default ContainerPage;